const { supabaseAdmin } = require("./config/database");

async function deleteTestUser() {
  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("email", "test@example.com");

    if (error) {
      console.error("Error deleting test user:", error);
    } else if (data && data.length > 0) {
      console.log("Test user deleted successfully.");
    } else {
      console.log("Test user not found.");
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

deleteTestUser();

