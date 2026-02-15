// @path: src/routes/+page.js
import { redirect } from '@sveltejs/kit';
import { getDashboard } from '$lib/data';

export async function load() {
  try {
    const dashboard = await getDashboard();

    if (!dashboard) {
      throw redirect(302, '/login');
    }

    return { dashboard };
  } catch {
    throw redirect(302, '/login');
  }
}
