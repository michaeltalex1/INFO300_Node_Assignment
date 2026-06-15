const readline = require('readline-sync');

function subnetHostChecker() {
    console.log("\n=== Subnet Host Checker ===\n");

    let vpcCIDR = parseInt(readline.question("Enter VPC CIDR (16-30): "));
    let subnetCIDR = parseInt(readline.question("Enter Subnet CIDR (16-30): "));
    let devices = parseInt(readline.question("Enter number of devices required: "));

    if (
        isNaN(vpcCIDR) ||
        isNaN(subnetCIDR) ||
        vpcCIDR < 16 ||
        vpcCIDR > 30 ||
        subnetCIDR < 16 ||
        subnetCIDR > 30
    ) {
        console.log("\nInvalid CIDR value. CIDR must be between /16 and /30.");
        return;
    }

    if (isNaN(devices) || devices <= 0) {
        console.log("\nInvalid device count. Must be a positive integer.");
        return;
    }

    console.log("\nResults:");

    if (subnetCIDR >= vpcCIDR) {
        console.log("Subnet CIDR is consistent with the VPC CIDR.");
    } else {
        console.log("Subnet CIDR is NOT consistent with the VPC CIDR.");
    }

    let totalIPs = Math.pow(2, 32 - subnetCIDR);
    let usableIPs = totalIPs - 2;

    console.log("Usable IP Addresses: " + usableIPs);

    if (usableIPs >= devices) {
        console.log("Subnet is sufficient for the required devices.");
        console.log("Unused IP Addresses: " + (usableIPs - devices));
    } else {
        console.log("Subnet is NOT sufficient for the required devices.");
        console.log("Additional IP Addresses Needed: " + (devices - usableIPs));
    }
}

function computeEnvironmentSelector() {
    console.log("\n=== Compute Environment Selector ===\n");

    let appName = readline.question("Enter application name: ");
    let monthlyUsers = parseInt(readline.question("Enter monthly users: "));
    let monthlyBudget = parseFloat(readline.question("Enter monthly budget: "));
    let highAvailability = readline.question("High availability required? (yes/no): ").toLowerCase();

    if (appName.trim() === "") {
        console.log("\nInvalid application name. Application name cannot be blank.");
        return;
    }

    if (isNaN(monthlyUsers) || monthlyUsers < 0) {
        console.log("\nInvalid monthly users. Monthly users must be 0 or higher.");
        return;
    }

    if (isNaN(monthlyBudget) || monthlyBudget < 0) {
        console.log("\nInvalid monthly budget. Budget must be 0 or higher.");
        return;
    }

    if (highAvailability !== "yes" && highAvailability !== "no") {
        console.log("\nInvalid high availability answer. Please enter yes or no.");
        return;
    }

    let recommendation = "";

    if (monthlyBudget < 1000) {
        recommendation = "Single EC2 only";
    } else if (monthlyUsers > 10000 || highAvailability === "yes") {
        if (monthlyBudget >= 1000 && monthlyBudget <= 3000) {
            recommendation = "EC2 + Load Balancer";
        } else {
            recommendation = "EC2 + Load Balancer + Auto Scaling";
        }
    } else if (monthlyUsers >= 1000 && monthlyUsers <= 10000) {
        recommendation = "EC2 + Load Balancer";
    } else if (monthlyUsers < 1000 && highAvailability === "no") {
        recommendation = "Single EC2";
    }

    console.log("\nResults:");
    console.log("Application Name: " + appName);
    console.log("Monthly Users: " + monthlyUsers);
    console.log("Monthly Budget: $" + monthlyBudget);
    console.log("High Availability Required: " + highAvailability);
    console.log("Recommended Environment: " + recommendation);
}

function mainMenu() {
    let choice;

    do {
        console.log("\n================================");
        console.log("Infrastructure Decision Tool");
        console.log("================================");
        console.log("1. Subnet Host Checker");
        console.log("2. Compute Environment Selector");
        console.log("3. Exit");

        choice = readline.question("\nSelect an option: ");

        switch (choice) {
            case "1":
                subnetHostChecker();
                break;
            case "2":
                computeEnvironmentSelector();
                break;
            case "3":
                console.log("\nGoodbye!");
                break;
            default:
                console.log("\nInvalid selection.");
        }

    } while (choice !== "3");
}

mainMenu();