- [ ] Probably need to make `Args` generic parameter required to extend object.
- [ ] Data probably needs to extend from object
- [ ] Endpoints are requesting we provide them with params / args -> I think we are providing those directly into the handler methods.
- [X] Bug in `applyPermissions` -> Not applying changes. 

NOTE: I'm not really sure about this one.
- [ ] Update names in `models` to reflect new paradigm
    - get methods should return `Model<Roles | Permissions | Actions>`, which is the full set of those particular fields that can be accessed by the model.
    - use methods should return `Response<Roles | Permissions | Actions>` which is the full set of those particular fields that will be delivered to the client.
