import { get } from "./model-api-request";
import { ModelResponse, SanitizedFieldViews, View } from "./models"
import { Permission } from "./permissions";
import { useState, useEffect } from 'react'

type FieldAccessor<Data> = {
  [K in keyof Data]: Data[K] extends object
    ? FieldAccessor<Data[K]>
    : { value: Data[K] | null; permissions: Permission[]; canRead: boolean; canUpdate: boolean };
};

function createFieldAccessor<Data>(fields: SanitizedFieldViews<Data>): FieldAccessor<Data> {
  const accessor = {} as Record<string, unknown>;

  for (const [key, field] of Object.entries(fields as Record<string, unknown>)) {
    if (field && typeof field === 'object' && 'data' in field && 'permissions' in field) {
      const f = field as { data: unknown; permissions: Permission[] };
      accessor[key] = {
        value: f.data,
        permissions: f.permissions,
        canRead: f.permissions.includes('read'),
        canUpdate: f.permissions.includes('update'),
      };
    } else if (field && typeof field === 'object') {
      accessor[key] = createFieldAccessor(field as SanitizedFieldViews<unknown>);
    }
  }

  return accessor as FieldAccessor<Data>;
}

interface PermissionsReturn<Data, Action> {
  response: ModelResponse<Data, Action> | undefined;
  fields: FieldAccessor<Data> | undefined;
  actions: Action[];
  isLoading: boolean;
}

interface UsePermissionsProps<Data, Args, Action, Role> {
  view: View<Data, Args, Action, Role>;
  args?: Args;
}

export default function usePermissions<Data, Args, Action, Role>({ view, args }: UsePermissionsProps<Data, Args, Action, Role>): PermissionsReturn<Data, Action> {
  const [response, setResponse] = useState<ModelResponse<Data, Action> | undefined>()
  const [fields, setFields] = useState<FieldAccessor<Data> | undefined>()
  const [actions, setActions] = useState<Action[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const argsKey = JSON.stringify(args);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);

      const baseUrl = view.endpoints.get.url ?? view.endpoints.url;
      if (!baseUrl) {
        throw new Error("No URL defined in view endpoints");
      }

      const params = new URLSearchParams();
      if (args) {
        for (const [key, value] of Object.entries(args)) {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        }
      }

      const queryString = params.toString();
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

      const result = await get<Data, Action>(url, view.endpoints.headers);

      if (!cancelled && result) {
        setResponse(result);
        if (result.data) {
          setFields(createFieldAccessor(result.data));
        }
        setActions(result.actions ?? []);
      }

      setIsLoading(false);
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [argsKey]);

  return { response, fields, actions, isLoading };
}
