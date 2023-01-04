# Script

Node script that checks if AINFTS have tokenURL, if not, it will call the api
to generate a random image stored in ipfs, and then, having the ipfs image
hash it will call setTokenURL of AINFT contract to set it. It will be running
24/7 and will check like once in x time (through infura provider so use it wisely)
