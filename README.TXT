INFO300 Node Assignment

Infrastructure Decision Tool

This program runs in Node.js and includes two tools:
1. Subnet Host Checker
2. Compute Environment Selector


Example 1 - Subnet Sufficient

VPC CIDR: /16
Subnet CIDR: /24
Devices Required: 100

Result:
The subnet is consistent with the VPC CIDR.
The subnet is sufficient for the required devices.
154 unused IP addresses remain.

Explanation:
The program calculates the number of usable IP addresses in the subnet and compares that value to the number of devices required. Since a /24 subnet provides enough addresses for 100 devices, the subnet is sufficient and the remaining addresses are reported.


Example 2 - Subnet Not Sufficient

VPC CIDR: /16
Subnet CIDR: /30
Devices Required: 10

Result:
The subnet is consistent with the VPC CIDR.
The subnet is not sufficient for the required devices.
8 additional IP addresses are needed.

Explanation:
The program calculates the number of usable IP addresses available in the subnet and compares that number to the required devices. A /30 subnet only provides 2 usable addresses, which is not enough for 10 devices, so the program reports the additional addresses needed.


Compute Environment Selector Explanation:
The program asks for an application name, monthly users, monthly budget, and whether high availability is required. It then recommends an environment such as Single EC2, EC2 with a Load Balancer, or EC2 with a Load Balancer and Auto Scaling based on the rules in the assignment.