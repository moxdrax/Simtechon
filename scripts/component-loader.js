document.addEventListener("DOMContentLoaded", function () {
    // ─── Load Header ───
    loadComponent("header.html", "header-placeholder");

    // ─── Load Footer ───
    loadComponent("footer.html", "footer-placeholder");

    function loadComponent(url, placeholderId) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${url}`);
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                    
                    // Execute scripts in the injected HTML
                    const scripts = placeholder.querySelectorAll("script");
                    scripts.forEach(oldScript => {
                        const newScript = document.createElement("script");
                        Array.from(oldScript.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });
                        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                        oldScript.parentNode.replaceChild(newScript, oldScript);
                    });
                }
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }
});
