import { z, defineCollection } from "astro:content";

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    imagePath: z.string(),
    gitHubUrl: z.string(),
    previewUrl: z.string().optional(),
    tags: z.array(z.string()),
    techStack: z.array(z.string()),
    isExperimental: z.boolean().optional(),
  }),
});

export const collections = {
  project: projectCollection,
};
