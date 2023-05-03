# Run The Project

In order to run the project, you need to first run the "Smart_Authentication_Dashboard" microservice then follow these instructions.


Start Local SSL Proxy 
-------------

The frontend in its new version is now running on a local SSL proxy so make sure to follow these instructions first before you run your project:

    $ yarn
    $ sudo apt-get update
    $ sudo apt install wget libnss3-tools
    $ curl -s https://api.github.com/repos/FiloSottile/mkcert/releases/latest| grep browser_download_url  | grep linux-amd64 | cut -d '"' -f 4 | wget -qi -
    $ mv mkcert-v*-linux-amd64 mkcert
    $ chmod a+x mkcert
    $ sudo mv mkcert /usr/local/bin/
    $ mkcert -install
    $ mkcert localhost
    $ npm install -g local-ssl-proxy
    $ local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 3001 --target 3000
    
    
Run Project
------------- 

Open a first terminal window and execute this command:

    $ local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 3001 --target 3000
    
Open a new terminal window while keeping the previous command running in the background and type the following command:
    
    $ yarn dev
