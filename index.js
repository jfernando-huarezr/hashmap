import HashMap from "./src/hash-map.js";

// Create a new HashMap
const userProfile = new HashMap();

// Insert some key-value pairs
userProfile.set("username", "johndoe123");
userProfile.set("email", "johndoe123@example.com");
userProfile.set("firstName", "John");
userProfile.set("lastName", "Doe");
userProfile.set("age", 30);
userProfile.set("country", "USA");
userProfile.set("occupation", "Software Developer");
userProfile.set("hobbies", "Reading, Hiking, Programming");
userProfile.set("favoriteColor", "Blue");
userProfile.set("bio", "A software developer who loves to code.");

// Print the HashMap
console.log(userProfile.entries());
