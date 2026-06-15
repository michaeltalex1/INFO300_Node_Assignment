Infrastructure Decision Tool

Example 1 - Subnet Sufficient
VPC CIDR: /16
Subnet CIDR: /24
Devices Required: 100

Result:
The subnet is consistent with the VPC CIDR.
The subnet is sufficient for the required devices.
There are 154 unused IP addresses.

Example 2 - Subnet Not Sufficient
VPC CIDR: /16
Subnet CIDR: /30
Devices Required: 10

Result:
The subnet is consistent with the VPC CIDR.
The subnet is not sufficient for the required devices.
8 additional IP addresses are needed.

Explanation:
The program calculates the number of usable IP addresses in the subnet using CIDR notation. It compares the available addresses to the number of devices requested and reports whether the subnet can support the requirement. If not, it displays the additional addresses needed.