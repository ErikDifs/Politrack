<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionResult } from '@sveltejs/kit';
  import type { PageData } from './$types';
  import { Users, CheckCircle, AlertCircle } from 'lucide-svelte';

  interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
  }

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let users: User[] = $state((() => data.users ?? [])());
  let name = $state('');
  let email = $state('');
  let errors: Record<string, string> = $state({});
  let isSubmitting = $state(false);
  let successMessage = $state('');
  let generalError = $state('');

  /**
   * Handle form submission with enhance
   */
  function handleSubmit() {
    isSubmitting = true;
    errors = {};
    generalError = '';

    return async ({ result }: { result: ActionResult }) => {
      if (result.type === 'success') {
        // Success response from server action
        if (result.data?.user) {
          users = [...users, result.data.user];
        }
        successMessage = result.data?.message || 'User created successfully';
        name = '';
        email = '';
        errors = {};

        // Auto-dismiss success message after 3 seconds
        setTimeout(() => {
          successMessage = '';
        }, 3000);
      } else if (result.type === 'failure') {
        // Form submission failed with validation errors
        if (result.data?.errors) {
          errors = result.data.errors;
        }
        if (result.data?.error) {
          generalError = result.data.error;
        }
      } else if (result.type === 'error') {
        // Server error
        generalError = 'An unexpected error occurred';
      }
      isSubmitting = false;
    };
  }

  /**
   * Clear error messages
   */
  function clearError() {
    generalError = '';
    errors = {};
  }
</script>

<div class="space-y-8">
  <!-- Welcome Section -->
  <section class="rounded-lg border border-slate-700 bg-slate-800 p-8">
    <h2 class="text-2xl font-bold text-white">Welcome to PoliTrack</h2>
    <p class="mt-2 text-slate-300">
      A production-ready monorepo template for AI-assisted development
    </p>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded border border-slate-600 bg-slate-700 p-4">
        <h3 class="font-semibold text-white">SvelteKit</h3>
        <p class="text-sm text-slate-400">Full-stack framework</p>
      </div>
      <div class="rounded border border-slate-600 bg-slate-700 p-4">
        <h3 class="font-semibold text-white">PostgreSQL</h3>
        <p class="text-sm text-slate-400">Relational database</p>
      </div>
      <div class="rounded border border-slate-600 bg-slate-700 p-4">
        <h3 class="font-semibold text-white">Drizzle ORM</h3>
        <p class="text-sm text-slate-400">Type-safe database</p>
      </div>
    </div>
  </section>

  <!-- Create User Form -->
  <section class="rounded-lg border border-slate-700 bg-slate-800 p-8">
    <h2 class="text-2xl font-bold text-white">Create User</h2>
    <p class="mt-1 text-sm text-slate-400">Add a new user to the system</p>

    {#if successMessage}
      <div
        class="mt-4 flex items-center gap-3 rounded-lg bg-green-900/20 px-4 py-3 border border-green-700"
      >
        <CheckCircle class="h-5 w-5 text-green-400" />
        <p class="text-green-300">{successMessage}</p>
      </div>
    {/if}

    {#if generalError}
      <div
        class="mt-4 flex items-center justify-between gap-3 rounded-lg bg-red-900/20 px-4 py-3 border border-red-700"
      >
        <div class="flex items-center gap-3">
          <AlertCircle class="h-5 w-5 text-red-400" />
          <p class="text-red-300">{generalError}</p>
        </div>
        <button onclick={clearError} class="text-red-400 hover:text-red-300 font-semibold">
          ✕
        </button>
      </div>
    {/if}

    <form use:enhance={handleSubmit} method="post" action="?/adduser" class="mt-6 space-y-4">
      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-medium text-slate-300"> Name </label>
        <input
          id="name"
          type="text"
          name="name"
          bind:value={name}
          placeholder="John Doe"
          class={`mt-1 w-full rounded border px-4 py-2 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
            errors.name
              ? 'border-red-600 focus:ring-red-500'
              : 'border-slate-600 focus:ring-blue-500'
          }`}
          disabled={isSubmitting}
          required
        />
        {#if errors.name}
          <p class="mt-1 text-sm text-red-400">{errors.name}</p>
        {/if}
      </div>

      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-slate-300"> Email </label>
        <input
          id="email"
          type="email"
          name="email"
          bind:value={email}
          placeholder="john@example.com"
          class={`mt-1 w-full rounded border px-4 py-2 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
            errors.email
              ? 'border-red-600 focus:ring-red-500'
              : 'border-slate-600 focus:ring-blue-500'
          }`}
          disabled={isSubmitting}
          required
        />
        {#if errors.email}
          <p class="mt-1 text-sm text-red-400">{errors.email}</p>
        {/if}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        disabled={isSubmitting}
        class="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  </section>

  <!-- Users List Section -->
  <section class="rounded-lg border border-slate-700 bg-slate-800 p-8">
    <div class="flex items-center gap-2">
      <Users class="h-6 w-6 text-blue-400" />
      <h2 class="text-2xl font-bold text-white">Users</h2>
      <span class="ml-auto text-sm text-slate-400">{users.length} total</span>
    </div>

    {#if users.length === 0}
      <p class="mt-6 text-center text-slate-400 py-8">
        No users yet. Create one using the form above!
      </p>
    {:else}
      <div class="mt-6 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-600">
              <th class="px-4 py-2 text-left font-semibold text-slate-300">Name</th>
              <th class="px-4 py-2 text-left font-semibold text-slate-300">Email</th>
              <th class="px-4 py-2 text-left font-semibold text-slate-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {#each users as user (user.id)}
              <tr class="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                <td class="px-4 py-3 text-slate-100">{user.name}</td>
                <td class="px-4 py-3 text-slate-300">{user.email}</td>
                <td class="px-4 py-3">
                  <span
                    class={`rounded-full px-2 py-1 text-xs font-medium ${
                      user.isActive ? 'bg-green-900 text-green-200' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </section>
</div>
