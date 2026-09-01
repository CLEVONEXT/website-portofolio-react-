import { supabase } from '../services/supabase';

/**
 * Initialize storage buckets if they don't exist
 * This is a helper function to ensure proper storage configuration
 */
export async function initializeStorageBuckets(): Promise<void> {
  try {
    // Try to list buckets to see if we have permission and connection
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.warn('Could not list buckets:', listError.message);
      return;
    }

    console.log('Available buckets:', buckets?.map(b => b.name));

    // Check if 'profile' bucket exists
    const profileBucketExists = buckets?.some(b => b.name === 'profile');

    if (!profileBucketExists) {
      console.warn('Profile bucket does not exist. Please create it in Supabase dashboard:');
      console.warn('1. Go to Storage section in Supabase');
      console.warn('2. Click "New bucket"');
      console.warn('3. Name it "profile"');
      console.warn('4. Set visibility to Public');
      console.warn('5. Enable "File upload" in RLS policies');
    } else {
      console.log('Profile bucket is ready');
    }
  } catch (error) {
    console.error('Error checking storage buckets:', error);
  }
}

/**
 * Check if storage is properly configured
 */
export async function checkStorageHealth(): Promise<boolean> {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    return buckets?.some(b => b.name === 'profile') || false;
  } catch (error) {
    console.error('Storage health check failed:', error);
    return false;
  }
}
