import { Icons } from "@shared/assets"
import styles from "./Community.module.scss"
import type { Rule } from "antd/es/form"

export const selectOptions = [
  { label: "Technology", value: "technology" },
  { label: "Programming", value: "programming" },
  { label: "Design", value: "design" },
  { label: "Photography", value: "photography" },
  { label: "Music", value: "music" },
  { label: "Gaming", value: "gaming" },
  { label: "Sports", value: "sports" },
  { label: "Fitness", value: "fitness" },
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Art", value: "art" },
  { label: "Books", value: "books" },
  { label: "Movies", value: "movies" },
  { label: "Business", value: "business" },
  { label: "Education", value: "education" },
  { label: "Science", value: "science" },
  { label: "Health", value: "health" },
  { label: "Fashion", value: "fashion" },
  { label: "Beauty", value: "beauty" },
  { label: "Cooking", value: "cooking" },
  { label: "DIY", value: "diy" },
  { label: "Pets", value: "pets" },
  { label: "Nature", value: "nature" },
  { label: "Cars", value: "cars" },
  { label: "Finance", value: "finance" },
  { label: "Startups", value: "startups" },
  { label: "Marketing", value: "marketing" },
  { label: "Writing", value: "writing" },
  { label: "Entrepreneurship", value: "entrepreneurship" },
  { label: "Lifestyle", value: "lifestyle" }
]

export const suffix = (
  <div className={styles.suffix}>
    <Icons.Community.Create.ArrowDown />
  </div>
)

export const nameRules: Rule[] = [
  { required: true, message: 'Community name is required' },
  { min: 3, message: 'Name must be at least 3 characters' },
  { max: 30, message: 'Name must be less than 30 characters' },
  {
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
    message: 'Name can only contain letters, numbers, spaces, hyphens and underscores'
  }
]

export const descriptionRules: Rule[] = [
  { required: true, max: 180, message: 'Description must be less than 180 characters' }
]

export const categoryRules: Rule[] = [
  {
    required: true,
    message: 'Please select at least one category',
    type: 'array' as const,
    min: 1,
  }
]

export const privacyRules: Rule[] = [
  { required: true, message: 'Please select privacy setting' }
]