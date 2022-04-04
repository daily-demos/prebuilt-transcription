# Daily Prebuilt + Transcription

[Daily Prebuilt](https://daily.co/prebuilt) embedded into a [Next.js](https://nextjs.org/) app with live transcription.

You can check out the live demo [here](https://daily-prebuilt-transcription.vercel.app). Use the following URL path pattern to test with your Daily domain and room: `https://daily-prebuilt-transcription.vercel.app/your-domain/your-room-name-here`

To join as owner, pass in `?t=TOKEN` to the end of your URL

## Requirements

To use this demo, you will first need to [create a Daily account](https://dashboard.daily.co/signup). Once you have an account and are logged into the [Daily Dashboard](https://dashboard.daily.co), you can [create a new Daily room](https://dashboard.daily.co/rooms/create) or use our [REST API](https://docs.daily.co/reference/rest-api/rooms).

To set up transcription, you will have to [`enable_transcription` on your Daily domain](https://docs.daily.co/reference/rest-api/your-domain/config#enable_transcription). For a full tutorial on setting up transcription, see our blog post, [Add live transcription to a Daily call with our newest API](https://www.daily.co/blog/add-live-transcription-to-a-daily-call-with-our-newest-api/).

## Daily methods and events

This demo uses the following Daily factory methods:

- [`wrap()`](https://docs.daily.co/reference/daily-js/factory-methods/wrap)

This demo uses the following Daily instance methods:

- [`join()`](https://docs.daily.co/reference/daily-js/instance-methods/join)
- [`startTranscription()`](https://docs.daily.co/reference/daily-js/instance-methods/start-transcription)
- [`stopTranscription()`](https://docs.daily.co/reference/daily-js/instance-methods/stop-transcription)

This demo uses the following Daily meeting events:

- [`joined-meeting`](https://docs.daily.co/reference/daily-js/events/meeting-events#joined-meeting)
- [`transcription-started`](https://docs.daily.co/reference/daily-js/events/transcription-events#transcription-started)
- [`transcription-stopped`](https://docs.daily.co/reference/daily-js/events/transcription-events#transcription-stopped)

## Running locally

Install dependencies:

```bash
npm i
```

Run the dev server:

```bash
npm run dev
```

Locally, open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploy your own on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/daily-co/clone-flow?repository-url=https%3A%2F%2Fgithub.com%2Fdaily-demos%2Fdaily-prebuilt-transcription.git&project-name=daily-prebuilt-transcription&repo-name=daily-prebuilt-transcription
