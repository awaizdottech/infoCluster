# Info Cluster

A full-fledged blog application implemented with industry level practices!

## features

- Users can also hide their blogs whenever they wish as well as unhide them.

## Installation

### Prerequisites

- Node.js
- Appwrite Developer Account
- TinyMCE Developer Account

### Steps

Provide step-by-step instructions to get the development environment running.

1. Clone the repository:
   ```bash
   git clone https://github.com/awaizdottech/infoCluster
   ```
2. Navigate into the project directory:
   ```bash
   cd infoCluster
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up all necessary environment variables:
   ```bash
   cp .env.sample .env
   ```
5. Run the project locally:
   ```bash
   npm run dev
   ```

## Simplified Overview / Architecture

!["code flow diagram"](flow.png)

## Future Plans

- docker
- identify & set image upload limit as big images arent available via getFilePreview
- use image compression available in appwrite
- create account delete option, acc's post delete or keep
- create profile pages & writer mentioned in posts with redirects to profile pages of course
- use skeleton for images, title, etc
- limit the loading animation then display error info wherever there's loading animation
- light mode & mode change switch
