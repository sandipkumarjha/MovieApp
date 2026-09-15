import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Profile fetch error:", error);
          return;
        }

        setProfile(data);
        setUsername(data.username || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, navigate]);

  // Upload avatar
  const uploadAvatar = async (event) => {
  try {
    const file = event.target.files?.[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Maximum 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB");
      return;
    }

    setUploading(true);

    // Keep one fixed avatar file for each user
    const filePath = `${user.id}/avatar.${file.name.split(".").pop()}`;

    // Upload / replace existing avatar
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("Avatar upload error:", uploadError);
      alert("Failed to upload avatar");
      return;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const avatarUrl = publicUrlData.publicUrl;

    // Save URL in profiles table
    const { data, error: profileError } = await supabase
      .from("profiles")
      .update({
        avatar_url: avatarUrl,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (profileError) {
      console.error("Profile avatar update error:", profileError);
      alert("Avatar uploaded but profile update failed");
      return;
    }

    setProfile(data);

    alert("Avatar updated successfully!");

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setUploading(false);

    // Allows selecting the same file again
    event.target.value = "";
  }
};

  const saveProfile = async () => {
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }

    try {
      setSaving(true);

      const { data, error } = await supabase
        .from("profiles")
        .update({
          username: username.trim(),
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Profile update error:", error);
        alert("Failed to update profile");
        return;
      }

      setProfile(data);
      setUsername(data.username);
      setEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setUsername(profile?.username || "");
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <p className="text-white text-lg">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] px-5 py-10 md:px-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            My Profile
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-white"
          >
            ← Back
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-zinc-900 rounded-xl p-6 md:p-8">

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">

            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#6556CD]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#6556CD] flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {(profile?.username || profile?.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>
            )}

            {/* Upload Button */}
            <label className="mt-4 cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition">
              {uploading ? "Uploading..." : "Change Avatar"}

              <input
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className="hidden"
              />
            </label>

            <p className="text-zinc-500 text-xs mt-2">
              JPG, PNG or WebP • Max 2MB
            </p>
          </div>

          {/* Username */}
          <div className="mb-5">
            <p className="text-zinc-500 text-sm mb-1">
              Username
            </p>

            {editing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#6556CD]"
              />
            ) : (
              <p className="text-white text-lg">
                {profile?.username || "Not set"}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <p className="text-zinc-500 text-sm mb-1">
              Email
            </p>

            <p className="text-white text-lg break-all">
              {profile?.email || user?.email}
            </p>
          </div>

          {/* Member Since */}
          <div>
            <p className="text-zinc-500 text-sm mb-1">
              Member Since
            </p>

            <p className="text-white text-lg">
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* Buttons */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="w-full mt-8 bg-[#6556CD] hover:bg-[#574bc4] text-white py-3 rounded-lg transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3 mt-8">

              <button
                onClick={saveProfile}
                disabled={saving}
                className="flex-1 bg-[#6556CD] hover:bg-[#574bc4] disabled:opacity-50 text-white py-3 rounded-lg transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={cancelEdit}
                disabled={saving}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-lg transition"
              >
                Cancel
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;