// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const form = document.getElementById('validationForm');
    const modal = document.getElementById('resultModal');
    const closeBtn = document.querySelector('.close');
    const resultData = document.getElementById('resultData');
    const clearButton = document.getElementById('clearButton');
    
    // Regular expressions for validating each form field
    const patterns = {
        fullName: /^[А-ЯІЇЄҐ][а-яіїєґ]+\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/,
        phone: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
        idCard: /^[А-ЯІЇЄҐ]{2}\s№\d{6}$/,
        birthDate: /^\d{2}\.\d{2}\.\d{4}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    };
    
    // Validate a single form field
    function validateField(fieldName, value) {
        const pattern = patterns[fieldName];
        return pattern.test(value);
    }
    
    // Display error in form field
    function showError(field, message) {
        const input = document.getElementById(field);
        const errorSpan = input.nextElementSibling;
        
        input.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }
    
    // Hide error in form field
    function hideError(field) {
        const input = document.getElementById(field);
        const errorSpan = input.nextElementSibling;
        
        input.classList.remove('error');
        errorSpan.style.display = 'none';
    }
    
    // Clear all form fields
    function clearForm() {
        const inputs = form.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            input.value = '';
            hideError(input.id);
        });
    }
    
    // Form submit event handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Validate each form field
        for (const field in patterns) {
            const value = document.getElementById(field).value.trim();
            formData[field] = value;
            
            if (!validateField(field, value)) {
                isValid = false;
                showError(field, 'Некоректний формат');
            } else {
                hideError(field);
            }
        }
        
        // If field doesn't match regular expression
        if (isValid) {
            resultData.innerHTML = `
                <p><strong>ПІБ</strong> ${formData.fullName}</p>
                <p><strong>Телефон</strong> ${formData.phone}</p>
                <p><strong>ID-card</strong> ${formData.idCard}</p>
                <p><strong>Дата народження</strong> ${formData.birthDate}</p>
                <p><strong>E-mail</strong> ${formData.email}</p>
            `;
            modal.style.display = 'block';
        }
    });
    
    // Clear form button handler
    clearButton.addEventListener('click', clearForm);
    
    // Modal window close handlers
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Interactive Table
    const table = document.getElementById('interactiveTable');
    const colorPicker = document.getElementById('colorPicker');
    const variantNumber = 4;

    // Create 6x6 table with numbers from 1 to 36
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('td');
            const cellNumber = i * 6 + j + 1;
            cell.textContent = cellNumber;
            cell.dataset.number = cellNumber;
            
            // Check if this is the variant cell
            if (cellNumber === variantNumber) {
                cell.classList.add('variant-cell');
                
                /**
                 * Mouseover handler for variant cell
                 * Changes cell color to random
                 */
                cell.addEventListener('mouseover', function() {
                    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                    this.style.backgroundColor = randomColor;
                });
                
                /**
                 * Click handler for variant cell
                 * Changes cell color to selected from palette
                 */
                cell.addEventListener('click', function() {
                    this.style.backgroundColor = colorPicker.value;
                });
                
                /**
                 * Double click handler for variant cell
                 * Changes color of secondary diagonal cells
                 */
                cell.addEventListener('dblclick', function(e) {
                    e.preventDefault(); // Prevent default behavior
                    e.stopPropagation(); // Prevent event bubbling
                    
                    // Save current color of variant cell
                    const currentColor = this.style.backgroundColor;
                    
                    // Change secondary diagonal color
                    changeSecondaryDiagonalColor();
                    
                    // Restore variant cell color
                    this.style.backgroundColor = currentColor;
                });
            } else {
                // For other cells add class that limits functionality
                cell.classList.add('non-variant-cell');
            }
            
            row.appendChild(cell);
        }
        
        table.appendChild(row);
    }

    /**
     * Function to change color of secondary diagonal in table
     * Secondary diagonal - cells with coordinates [i][n-1-i]
     */
    function changeSecondaryDiagonalColor() {
        const rows = table.getElementsByTagName('tr');
        const selectedColor = colorPicker.value;
        
        for (let i = 0; i < rows.length; i++) {
            const diagonalCell = rows[i].cells[rows.length - 1 - i];
            if (diagonalCell) {
                diagonalCell.style.backgroundColor = selectedColor;
            }
        }
    }
});