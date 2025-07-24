import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'your-project-id', // 需要替换为实际的项目ID
    dataset: 'production'
  }
}) 