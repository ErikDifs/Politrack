<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
    <!-- Name -->
    <h1 class="text-4xl font-bold text-gray-900 mb-2">{data.politician.name}</h1>

    <!-- Party Badge -->
    <div class="mb-6">
      <span class="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
        {data.politician.party}
      </span>
    </div>

    <!-- Profile Information -->
    <div class="space-y-6 mb-8">
      <!-- Jurisdiction -->
      <div>
        <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Jurisdiction</h2>
        <p class="mt-2 text-lg text-gray-900">{data.politician.jurisdiction}</p>
      </div>

      <!-- Office -->
      <div>
        <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Office</h2>
        <p class="mt-2 text-lg text-gray-900">{data.politician.office}</p>
      </div>

      <!-- Summary -->
      <div>
        <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Summary</h2>
        <p class="mt-2 text-base text-gray-700">{data.politician.summary}</p>
      </div>
    </div>

    <section class="border-t border-gray-200 pt-8">
      <h2 class="text-2xl font-bold text-gray-900">Accountability Events</h2>

      {#if data.events.length === 0}
        <p class="mt-4 text-gray-600">No accountability events available.</p>
      {:else}
        <ol class="mt-6 space-y-6">
          {#each data.events as event (event.id)}
            <li data-testid="event-item" class="border-l-4 border-blue-200 pl-5">
              <div class="flex flex-wrap items-center gap-3">
                <span
                  data-testid="event-type"
                  class="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {event.typeLabel}
                </span>
                <time datetime={event.date} class="text-sm font-medium text-gray-500">
                  {event.date}
                </time>
              </div>

              <h3 class="mt-3 text-lg font-semibold text-gray-900">{event.title}</h3>
              <p class="mt-2 text-base text-gray-700">{event.description}</p>

              <a
                href={event.sourceUrl}
                target="_blank"
                rel="noreferrer"
                class="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                View Source
              </a>
            </li>
          {/each}
        </ol>
      {/if}
    </section>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f9fafb;
  }
</style>
