export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) {
    return '?';
  }
  const first = parts[0];
  const last = parts.length > 1 ? parts[parts.length - 1] : null;
  const firstInitial = first !== undefined && first.length > 0 ? first[0] : '';
  const lastInitial = last !== null && last !== undefined && last.length > 0 ? last[0] : '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
}
