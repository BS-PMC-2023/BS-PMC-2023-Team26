// Get the container element to append the table
const container = document.getElementById("user-details");

// Create a table element
const table = document.createElement("table");

// Create the table header row
const headerRow = document.createElement("tr");
const nameHeader = document.createElement("th");
nameHeader.textContent = "Name";
const emailHeader = document.createElement("th");
emailHeader.textContent = "Email";
const phoneHeader = document.createElement("th");
phoneHeader.textContent = "Phone";
headerRow.appendChild(nameHeader);
headerRow.appendChild(emailHeader);
headerRow.appendChild(phoneHeader);
table.appendChild(headerRow);

// Fetch user details from Django backend API
fetch("/api/users")
  .then((response) => response.json())
  .then((users) => {
    // Loop through each user and create a row in the table
    users.forEach((user) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = user.name;
      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      const phoneCell = document.createElement("td");
      phoneCell.textContent = user.phone;
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(phoneCell);
      table.appendChild(row);
    });

    // Append the table to the container
    container.appendChild(table);
  })
  .catch((error) => console.error(error));
