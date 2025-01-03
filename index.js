const UserManager = require("./src/user-manager");

const userManager = new UserManager();

function displayUsers() {
  console.log("\nCurrent Users:");
  console.log("--------------");
  const users = userManager.getAllUsers();
  users.forEach(([email, data]) => {
    console.log(`Email: ${email}`);
    console.log("Data:", data);
  });
  console.log("***********************");
}

async function runDemo() {
  try {
    // Add users
    userManager.addUser("codewise1@example.com", {
      name: "CodeWise1",
      age: 30,
      role: "developer",
    });

    userManager.addUser("codewise2@example.com", {
      name: "CodeWise2",
      age: 25,
      role: "devops",
    });

    // Display initial users
    displayUsers();

    // Update a user
    console.log("\nUpdating CodeWise1 information...");
    userManager.updateUser("codewise1@example.com", {
      age: 35,
      role: "senior developer",
    });

    // Display users after update
    displayUsers();

    // Get specific user
    console.log("\nGetting specific user:");
    const user = userManager.getUser("codewise1@example.com");
    console.log("CodeWise1 data:", user);

    // Delete a user
    console.log("\nDeleting CodeWise1 account...");
    userManager.deleteUser("codewise1@example.com");

    // Display final user list
    displayUsers();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the demo
runDemo();
