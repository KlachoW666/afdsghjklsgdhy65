import { api } from './client';
import { CONFIG } from '../config';
import type { MockAppUser } from '../store/adminStore';

const base = CONFIG.API_BASE || '';

export async function fetchUsers(adminUserId: string): Promise<MockAppUser[]> {
  const res = await api.get<{ users: MockAppUser[] }>(
    `/api/users?userId=${encodeURIComponent(adminUserId)}`
  );
  return res.users || [];
}

export async function updateUser(
  userId: string,
  adminUserId: string,
  patch: { balance?: number; isBanned?: boolean; vipStatus?: boolean; notes?: string }
): Promise<MockAppUser> {
  const res = await api.patch<{ user: MockAppUser }>(
    `/api/users/${encodeURIComponent(userId)}?userId=${encodeURIComponent(adminUserId)}`,
    patch
  );
  return res.user;
}

export async function addBonus(userId: string, adminUserId: string, amount: number): Promise<MockAppUser> {
  const res = await api.post<{ user: MockAppUser }>(
    `/api/users/${encodeURIComponent(userId)}/bonus?userId=${encodeURIComponent(adminUserId)}`,
    { amount }
  );
  return res.user;
}

export async function resetBalance(userId: string, adminUserId: string): Promise<MockAppUser> {
  const res = await api.post<{ user: MockAppUser }>(
    `/api/users/${encodeURIComponent(userId)}/reset-balance?userId=${encodeURIComponent(adminUserId)}`,
    {}
  );
  return res.user;
}

// ZYPHEX admin
export async function getZyphexRate(adminUserId: string): Promise<number> {
  const res = await api.get<{ rate: number }>(`/api/admin/zyphex/rate?userId=${encodeURIComponent(adminUserId)}`);
  return res.rate ?? 100;
}

export async function setZyphexRate(adminUserId: string, rate: number): Promise<void> {
  await api.put(`/api/admin/zyphex/rate?userId=${encodeURIComponent(adminUserId)}`, { rate });
}

export async function downloadZyphexExportCsv(adminUserId: string): Promise<void> {
  const url = `${base}/api/admin/zyphex/export?userId=${encodeURIComponent(adminUserId)}&format=csv`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Export failed');
  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'zyphex_airdrop_export.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}
