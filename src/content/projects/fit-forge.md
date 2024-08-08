---
title: "FitForge"
description: "Full stack AI workout manager"
imagePath: "/src/images/project/fit-forge.webp"
tags: ["astro", "blogging", "learning in public"]
previewUrl: "https://fit-forge.app"
gitHubUrl: "https://github.com/greengem/fit-forge"
techStack:
  [
    "next",
    "typescript",
    "openai",
    "prisma",
    "database",
    "clerk",
    "recharts",
    "framer",
    "tailwind",
  ]
date: "2024-03-14"
---

## Introduction: The Spark of Inspiration

After bringing my portfolio to life with Next.js, I found myself pondering, "What's next?" As a developer with a knack for solving problems and a background in PHP, I was itching to dive deeper into Next.js's rich features, such as authentication, database operations, CRUD functionalities, and API integrations. The moment of inspiration struck unexpectedly through my dissatisfaction with a poorly designed workout app. Driven by a blend of personal frustration and a desire to create something meaningful for others, I embarked on a journey to develop a comprehensive workout manager. This project wasn't just another item on my portfolio; it became a labour of love.

## Choosing My Tools: A Deliberate Decision

Selecting the right technological tools was crucial for this endeavour. My excitement was palpable as I decided on:
Next.js 14: The joy of developing with this framework was unmatched, especially appreciating its server-side rendering capabilities, which I anticipated would be instrumental for this project.
Prisma with PostgreSQL: As a staunch advocate for TypeScript, Prisma's seamless integration and migration features were a major selling point.
ClerkAuth: Anyone who’s worked on auth knows it’s a rabbit hole. Clerk was my trusty shovel, making digging that hole a lot easier.

## Overcoming Challenges: The Exercise Module

![Exercises page](/assets/images/tux.png)

The idea was to create an engaging and interactive exercise module. I sourced an extensive open-source database for exercises, which I integrated with PostgreSQL, enabling customization on the fly. My initial approach involved static generation for rapid loading times, but I soon realized the need for more dynamism and interactivity. Implementing server-side rendering (SSR) allowed for shareable views, bookmarkable filtered results, and a personalized user experience with features like favourite exercises, history logs, and charts.

![Exercises page with filters](/assets/images/tux.png)

![Exercises (Responsive)](/assets/images/tux.png)

I leveraged URL parameters for filters and searches, ensuring the UI remained responsive and intuitive.

```
export default async function ExercisesPage({
  searchParams,
}: {
  searchParams?: {
    page?: number;
    perPage?: number;
    search?: string;
    muscle?: string;
    // etc
  };
}) {
```

```
const exercises = await prisma.exercise.findMany({
  take: perPage,
  skip: (currentPage - 1) * perPage,
  where: {
    AND: searchWords.map((word) => ({
      name: {
        contains: word,
        mode: "insensitive",
      },
    })),
    category: cat.length > 0 ? { in: cat as CategoryType[] } : undefined,
    level: level.length > 0 ? { in: level as LevelType[] } : undefined,
    force: force.length > 0 ? { in: force as ForceType[] } : undefined,
    equipment: equipmentOwned ? { in: userEquipmentOwned } : undefined,
    ...(muscle.length > 0 ? {
      OR: [
        { primary_muscles: { hasEvery: muscle as Muscle[] } },
        { secondary_muscles: { hasEvery: muscle as Muscle[] } }
      ]
    } : {}),
    ...(favs ? {
      favouritedBy: {
        some: {
          userId: userId,
        }
      }
    } : {})
  },
  orderBy: {
    name: "asc",
  },
});
```

```
export default function ExerciseFilterCategory() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterCategory(selection: Selection) {
    const terms = Array.from(selection);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (terms.length > 0) {
      params.set("cat", terms.join(","));
    } else {
      params.delete("cat");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const selectedCategory = searchParams.get("cat");
  const selectedKeys = selectedCategory
    ? new Set(selectedCategory.split(","))
    : undefined;

  return (
    <Select
      key={selectedKeys ? selectedKeys.size : "empty"}
      label="Category"
      placeholder="Select a category..."
      size="sm"
      items={categories}
      onSelectionChange={handleFilterCategory}
      selectedKeys={selectedKeys}
      startContent={<IconFilter size={18} />}
      selectionMode="multiple"
    >
      {(category) => (
        <SelectItem key={category.value}>{category.label}</SelectItem>
      )}
    </Select>
  );
}
```

## Enhancing User Experience: Modal Innovations

Addressing the challenge of displaying user data related to exercises, I utilized React's useContext hook to maintain a singular modal element dynamically loaded with content. This not only optimized performance but also enhanced user experience by reducing clutter and loading times. The decision to fetch data within modal tabs using SWR was strategic, ensuring data was fetched and cached efficiently, further boosting the app's responsiveness.

![Exercise Modal - About Tab](/assets/images/tux.png)

![Exercise Modal - History Tab](/assets/images/tux.png)

![Exercise Modal - Charts Tab](/assets/images/tux.png)

![Exercise Modal - Records Tab](/assets/images/tux.png)

## Making and Editing Routines: A Creative Approach

The routine builder posed a unique challenge due to the complexity of the data involved. Opting for a multi-page setup, I broke down the process into manageable steps, enhancing usability. By integrating the exercise page component into the routine builder, I streamlined the selection process, making it more intuitive and efficient. This innovation not only addressed usability concerns but also showcased the flexibility of Next.js in creating complex, user-friendly interfaces.

![Create / Edit Routines - Step 1](/assets/images/tux.png)

![Create / Edit Routines - Step 2](/assets/images/tux.png)

![Create / Edit Routines - Step 3](/assets/images/tux.png)

## Recording Workouts: Revolutionizing the User Experience

![Workout Logging](/assets/images/tux.png)

A cornerstone of this project, and arguably its most innovative aspect, is the workout recording functionality. This feature not only addresses but anticipates the user's needs, particularly considering the variable internet connectivity in many gyms. To combat potential data loss and ensure seamless user experience, I developed a robust local storage solution leveraging React's useContext. This approach meant that once a workout was initiated, all pertinent data, including exercises, sets, reps, and durations, was securely stored on the user's device. This foresight guarantees that users can proceed with their workouts without the fear of losing progress due to connectivity issues.
More than just a technical solution, this feature is designed with the gym-goer's journey in mind. Each exercise is presented on a card, dynamically displaying the required sets or duration, with checkboxes marking completion. This design not only aids in keeping track of progress but also significantly reduces the likelihood of input errors, enhancing the overall user experience. My solution includes validation mechanisms to guide users through their workout, ensuring every set is completed and correctly logged, enhancing both the usability and reliability of the app.
published

![Workout Logging (Responsive)](/assets/images/tux.png)

Additionally, this feature is seamlessly integrated into the broader app ecosystem. Real-time stats, such as a live timer, are accessible from anywhere within the app, allowing users to pause their workout or check the duration without navigating away from their current task. This level of integration and attention to detail underscores the workout recording feature's role as the heart of the app, providing a genuinely user-centric and adaptive experience.

## Dashboard and Activity Insights: Leveraging Advanced Features

![Dashboard](/assets/images/tux.png)

The dashboard is a testament to the power of advanced SSR, suspense loading, and caching techniques. With a focus on parallel data loading and visual appeal, I introduced dynamic charts and a date period slider that interactively updated queries based on user selection. This feature, along with visually striking access cards to frequently used app functions, exemplified the cutting-edge capabilities of Next.js and my commitment to creating a rich user experience.
published

![Dashboard (Responsive)](/assets/images/tux.png)

## Activity Page and Editing Workouts: Simplifying User Engagement

![Activity Page](/assets/images/tux.png)

The Activity page exemplifies the application's commitment to user-friendly design and functionality. This section of the app is designed for simplicity and ease of use, presenting workout data from the WorkoutLog database in an easily digestible card format. Each card not only displays summary information but also offers users the ability to dive deeper into their workout details through a modal. This modal utilizes a similar useContext approach as seen in the exercises page, ensuring consistency in user experience across the app.

![Edit Activity](/assets/images/tux.png)

One of the key features of the Activity page is the ability to edit past workouts directly from each card. By selecting the edit option, users are taken to a dedicated page that closely mirrors the workout log interface, yet provides enhanced flexibility. Here, users can thoroughly customize their past workouts — from adding or removing sets to adjusting the duration and date of each session. This functionality not only empowers users to maintain accurate and up-to-date records of their fitness journey but also reflects the app's overarching goal of providing a highly adaptable and personalizable workout management tool.
Integrating this section with the broader narrative of innovation and user-centric design, the Activity page and its editing capabilities underscore the project's holistic approach to fitness tracking. By enabling users to seamlessly modify their workout history, the app not only enhances the user experience but also fosters a sense of ownership and engagement with their fitness data.

## The Profile Page: A Hub of Personalization and Potential

![Profile Page](/assets/images/tux.png)

The Profile page, as it stands, is a testament to the app's commitment to providing a personalized fitness journey. It offers a clean, intuitive interface for users to track their measurements, update personal information, and customize their workout preferences. A distinctive aspect of the Profile page is its innovative feature that allows users to filter exercises based on available equipment, demonstrating a keen understanding of user needs and a dedication to practicality.
Looking ahead, the Profile page represents a platform for ongoing innovation. Plans to expand customization options will allow users to tailor their fitness experience even more closely to their personal goals and preferences. This forward-thinking approach underscores the project's overarching mission: to continuously enhance functionality and user satisfaction, adapting to evolving fitness trends and user feedback.
