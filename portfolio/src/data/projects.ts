import type { Project } from '../types';

// Fallback statis — dikosongkan sementara.
// Section Projects di Home hanya menampilkan data dari Supabase
// (tambahkan lewat Admin Panel: /admin/dashboard → tab Projects).
// Jika ingin mengembalikan fallback, isi array di bawah ini.
export const projects: Project[] = [];

export default projects;
