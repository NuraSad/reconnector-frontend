import supabase from "./config/supabaseClient";

export const getUserId = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const auth_user_id = user.id;

  let { data: user_data, user_error } = await supabase
    .from("user")
    .select("id")
    .eq("auth_user_id", auth_user_id);

  if (user_error) {
    console.log("Could not retrieve logged in user id " + user_error);
  }

  if (user_data) {
    return user_data[0].id;
  }

  return null;
};

export const getAuthUserId = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const auth_user_id = user.id;

  return auth_user_id;
};
