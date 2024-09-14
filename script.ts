// listing element
document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // type assertion
    const profilePictureInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const addressElement = document.getElementById(
      "address"
    ) as HTMLTextAreaElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLTextAreaElement;

    // *****
    const usernameElement = document.getElementById(
      "username"
    ) as HTMLInputElement;

    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      addressElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      usernameElement
    ) {
      // ***************************************

      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const address = addressElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const username = usernameElement.value;

      // picture elements
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";

      //   create resume output
      const resumeHTML = `
 <h2>Resume</h2>
 ${
   profilePictureURL
     ? `<img src="${profilePictureURL}" alt="Profile Picture"class="profilePicture">`
     : ""
 }
 <p><strong>Name:</strong><span id="edit-name" class="editable"> ${name} </span> </p>
<p><strong>Email:</strong><span id="edit-email" class="editable"> ${email} </span> </p>
 <p><strong>Phone Number :</strong><span id="edit-phone" class="editable"> ${phone} </span></p>
 <p><strong>Address Here... </strong><span id="edit-address" class="editable"> ${address} </span></p>

<h3>Education</h3>
<p id="edit-education" class="editable"> ${education}</p>

<h3>Experience</h3>
<p id="edit-experience" class="editable" > ${experience}</p>

<h3>Skills</h3>
<p id="edit-skills" class="editable "> ${skills}</p>

    `;
      // display the resume in the output container
      const resumeOutputElement = document.getElementById("resumeOutput");

      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hidden");

        // create container for buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        // Add Download PDF button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";

        downloadButton.addEventListener("click", () => {
          window.print();
        });
        buttonsContainer.appendChild(downloadButton);

        // Add Shareable Link Button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
          try {
            // Add shareble Link Button
            const shareableLink = `https://yourdomain.com/resumes/${name.replace(
              /\s+/g,
              "_"
            )}_cv.html`;

            //  use clipboard API to copy the shareable link;
            await navigator.clipboard.writeText(shareableLink);
            alert("Shareable link copied to clipboard!");
          } catch (err) {
            console.error("Failed to copy link", err);
            alert("Failed to copy link to clipboard. Please try again.");
          }
        });
        buttonsContainer.appendChild(shareLinkButton);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.error("Form element are missing");
    }
  });
