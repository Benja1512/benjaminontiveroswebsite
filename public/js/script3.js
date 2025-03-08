    
              
                  const projects = [
                    {
                      title: "Stock Market Dashboard",
                      description:
                        "A real-time dashboard for tracking stock prices, market trends, and investment insights.",
                      image:
                        "https://public.readdy.ai/ai/img_res/3262b25b14ad3920dffa9dc3ac6ebe99.jpg",
                      tags: ["React", "Node.js", "MongoDB"],
                      demo: "/portafolio/portafolio.html",
                      code: "#",
                      category: "web",
                    },
                    {
                      title: "Warehouse Management System",
                      description:
                        "A warehouse management system for tracking inventory, shipments, and order fulfillment. Features barcode scanning, automated alerts, and data analytics.",
                      image:
                        "https://public.readdy.ai/ai/img_res/8468ac88091807e440cc622cd325522b.jpg",
                      tags: ["Flutter", "Firebase", "Swift"],
                      demo: "/portafolio/portafolio2.html",
                      code: "#",
                      category: "supply chain",
                    },                    
                    {
                      title: "TourPeruTravellers",
                      description:
                        "An advanced system for optimizing travel experiences, showcasing Peru’s breathtaking routes, cultural destinations, and adventure tours.",        
                      image:
                        "https://public.readdy.ai/ai/img_res/01bf704dfe974b7650d44b4ce29ae578.jpg",
                      tags: ["Vue.js", "D3.js", "GraphQL"],
                      demo: "portafolio/portafolio4.html",
                      code: "#",
                      category: "web",
                    },
                    {
                      title: "SmartPack - AI-Powered Warehouse & Logistics App",
                      description:
                        "A mobile app for tracking fitness goals and workouts. Includes real-time activity tracking, social sharing, and personalized workout plans.",
                      image:
                        "https://public.readdy.ai/ai/img_res/01bf704dfe974b7650d44b4ce29ae578.jpg",
                      tags: ["Vue.js", "D3.js", "GraphQL"],
                      demo: "portafolio/portafolio3.html",
                      code: "#",
                      category: "mobile",
                    },



                    
                  ];
            
                  document.addEventListener("DOMContentLoaded", () => {
                    const filterBtns = document.querySelectorAll(".filter-btn");
                    filterBtns.forEach((btn) => {
                      btn.addEventListener("click", () => {
                        filterBtns.forEach((b) => b.classList.remove("bg-primary", "text-white"));
                        btn.classList.add("bg-primary", "text-white");
                        filterProjects(btn.dataset.filter);
                      });
                    });
            
                    const projectCards = document.querySelectorAll(".project-card");
                    projectCards.forEach((card) => {
                      card.addEventListener("click", () => {
                        const project = projects[Array.from(projectCards).indexOf(card)];
                        openModal(project);
                      });
                    });
            
                    const contactForm = document.getElementById("contactForm");
                    contactForm.addEventListener("submit", (e) => {
                      e.preventDefault();
                      const formData = new FormData(contactForm);
                      const data = Object.fromEntries(formData);
                      console.log("Form submitted:", data);
                      contactForm.reset();
                      showNotification("Message sent successfully!");
                    });
            
                    const themeToggle = document.getElementById("themeToggle");
                    themeToggle.addEventListener("click", toggleTheme);
                  });
            
                  function filterProjects(category) {
                    const cards = document.querySelectorAll(".project-card");
                    cards.forEach((card) => {
                      if (category === "all" || card.dataset.category === category) {
                        card.style.display = "block";
                      } else {
                        card.style.display = "none";
                      }
                    });
                  }
            
                  function openModal(project) {
                    const modal = document.getElementById("projectModal");
                    document.getElementById("modalTitle").textContent = project.title;
                    document.getElementById("modalImage").src = project.image;
                    document.getElementById("modalDescription").textContent = project.description;
            
                    const tagsContainer = document.getElementById("modalTags");
                    tagsContainer.innerHTML = project.tags
                      .map(
                        (tag) =>
                          `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${tag}</span>`,
                      )
                      .join("");
            
                    document.getElementById("modalDemo").href = project.demo;
                    document.getElementById("modalCode").href = project.code;
            
                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                  }
            
                  function closeModal() {
                    const modal = document.getElementById("projectModal");
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                  }
            
                  function showNotification(message) {
                    const notification = document.createElement("div");
                    notification.className =
                      "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-0 opacity-100 transition-all duration-300";
                    notification.textContent = message;
                    document.body.appendChild(notification);
            
                    setTimeout(() => {
                      notification.style.opacity = "0";
                      notification.style.transform = "translateY(100%)";
                      setTimeout(() => notification.remove(), 300);
                    }, 3000);
                  }
            
                  function toggleTheme() {
                    const icon = themeToggle.querySelector("i");
                    if (icon.classList.contains("ri-sun-line")) {
                      icon.classList.replace("ri-sun-line", "ri-moon-line");
                      document.documentElement.classList.add("dark");
                    } else {
                      icon.classList.replace("ri-moon-line", "ri-sun-line");
                      document.documentElement.classList.remove("dark");
                    }
                  }
            
                  window.onclick = (event) => {
                    const modal = document.getElementById("projectModal");
                    if (event.target === modal) {
                      closeModal();
                    }
                  };
               
