import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "s4zt1y35",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});