import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      gitHubUrl: z.string(),
      previewUrl: z.string().optional(),
      tags: z.array(z.string()),
      techStack: z.array(z.string()),
    }),
  });

export const collections = {
  'project': projectCollection,
};