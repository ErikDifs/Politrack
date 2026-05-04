<script lang="ts">
  import '../app.css';
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
  <header class="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
    <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-white">PoliTrack</h1>
      <p class="mt-1 text-sm text-slate-400">AI-assisted monorepo template</p>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <slot />
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
