# API

AINFT API


### Modules:

**openai**:

module that has a service to interact with openia, its responsable of generating images given a text prompt.

**ipfs**:

module that has a service to interact with ipfs, it responsable of storing the images given an url and fetching it through axios.

**images**:

module that given a text prompt generates an image through openai service and then it stores it in ipfs through ipfsservice. It has an endpoint to   generate an image.


### ENV

- API_KEY= api key of openai
- DATABASE_PATH= mongo path to connect to mongo database
- INFURA_PROJECT_ID= infura ipfs node project id
- INFURA_API_SECRET= infura ipfs node api secret
