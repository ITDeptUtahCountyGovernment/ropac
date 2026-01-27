import { UserProfile } from "../types/user";

export const users: UserProfile[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    address: {
      street: "123 Main St",
      city: "Seattle",
      country: "USA",
      coordinates: {
        lat: 47.6062,
        lng: -122.3321,
      },
    },
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: {
          enabled: true,
          frequency: "daily",
        },
      },
      theme: "dark",
    },
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    address: {
      street: "456 Oak Ave",
      city: "Portland",
      country: "USA",
      coordinates: {
        lat: 45.5152,
        lng: -122.6784,
      },
    },
    preferences: {
      notifications: {
        email: false,
        sms: true,
        push: {
          enabled: false,
          frequency: "weekly",
        },
      },
      theme: "light",
    },
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    address: {
      street: "789 Pine Rd",
      city: "Denver",
      country: "USA",
      coordinates: {
        lat: 39.7392,
        lng: -104.9903,
      },
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: {
          enabled: true,
          frequency: "instant",
        },
      },
      theme: "dark",
    },
  },
  {
    id: "4",
    name: "Dan Miller",
    email: "dan@example.com",
    address: {
      street: "321 Elm Blvd",
      city: "Austin",
      country: "USA",
      coordinates: {
        lat: 30.2672,
        lng: -97.7431,
      },
    },
    preferences: {
      notifications: {
        email: false,
        sms: false,
        push: {
          enabled: true,
          frequency: "weekly",
        },
      },
      theme: "light",
    },
  },
];
