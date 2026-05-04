<script lang="ts">
  import { Search, Calendar, ArrowRight } from 'lucide-svelte';

  interface EventWithPolitician {
    id: number;
    type: string;
    title: string;
    date: string;
    description: string;
    sourceUrl: string;
    politician: {
      id: number;
      name: string;
      party: string;
      office: string;
    };
  }

  let { data } = $props();

  let searchQuery = $state('');

  const eventTypeColors: Record<string, string> = {
    vote: 'bg-blue-900/30 text-blue-200 border-blue-700',
    statement: 'bg-purple-900/30 text-purple-200 border-purple-700',
    donation: 'bg-amber-900/30 text-amber-200 border-amber-700',
    promise: 'bg-green-900/30 text-green-200 border-green-700',
    missed_vote: 'bg-red-900/30 text-red-200 border-red-700',
  };

  const eventTypeIcons: Record<string, string> = {
    vote: '🗳️',
    statement: '📢',
    donation: '💰',
    promise: '🤝',
    missed_vote: '⏭️',
  };

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<div class="space-y-12">
  <!-- Hero Section -->
  <section class="space-y-6">
    <div class="space-y-3">
      <h1 class="text-4xl font-bold text-white">
        Track Political<br class="hidden sm:block" /> Accountability
      </h1>
      <p class="max-w-2xl text-lg text-slate-300">
        Stay informed about politicians' votes, statements, and actions. Search by politician,
        issue, or event.
      </p>
    </div>

    <!-- Search Bar -->
    <div class="relative max-w-2xl">
      <Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Search politicians, issues, events..."
        bind:value={searchQuery}
        class="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 pl-12 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
      />
    </div>
  </section>

  <!-- Recent Events Section -->
  <section class="space-y-6">
    <div class="space-y-2">
      <h2 class="text-2xl font-bold text-white">Recent Accountability Events</h2>
      <p class="text-slate-400">Latest votes, statements, and actions from politicians</p>
    </div>

    {#if data.events.length === 0}
      <div class="rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center">
        <p class="text-slate-400">No events available yet. Check back soon!</p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each data.events as event (event.id)}
          <a
            href="/politicians/{event.politician.id}"
            class="group block rounded-lg border border-slate-700 bg-slate-800/50 p-6 hover:border-slate-600 hover:bg-slate-800 transition-all"
          >
            <div class="space-y-4">
              <!-- Header with Type Badge -->
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-2 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl">{eventTypeIcons[event.type] ?? '📋'}</span>
                    <span
                      class={`inline-block rounded border px-2.5 py-1 text-xs font-medium ${eventTypeColors[event.type] ?? 'bg-slate-700 text-slate-200 border-slate-600'}`}
                    >
                      {event.type.replace('_', ' ')}
                    </span>
                  </div>
                  <h3
                    class="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors"
                  >
                    {event.title}
                  </h3>
                </div>
                <ArrowRight
                  class="h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors"
                />
              </div>

              <!-- Politician Info -->
              <div class="space-y-1">
                <p class="font-medium text-slate-100">{event.politician.name}</p>
                <div class="flex items-center gap-4 text-sm text-slate-400">
                  <span class="inline-block rounded-full bg-slate-700 px-2 py-1">
                    {event.politician.party}
                  </span>
                  <span>{event.politician.office}</span>
                </div>
              </div>

              <!-- Description -->
              <p class="line-clamp-2 text-slate-300">{event.description}</p>

              <!-- Footer: Date -->
              <div class="flex items-center gap-2 pt-2 text-sm text-slate-400">
                <Calendar class="h-4 w-4" />
                <span>{formatDate(event.date)}</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>

  <!-- CTA Section -->
  <section class="rounded-lg border border-blue-700/50 bg-blue-900/20 p-8 text-center">
    <h3 class="text-2xl font-bold text-white">Get Involved</h3>
    <p class="mt-2 text-slate-300">
      Create an account to follow politicians, save events, and stay updated on the issues that
      matter to you.
    </p>
    <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <a
        href="/signup"
        class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Create Account
      </a>
      <a
        href="/login"
        class="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-200 hover:bg-blue-900/30 transition-colors"
      >
        Sign In
      </a>
    </div>
  </section>
</div>
