export default {
  name: "page",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    {
      name: "slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "hero",
      type: "hero", // 👈 ADD THIS
    },
  ],
};