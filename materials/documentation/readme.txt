This readme file keep short descriptions of the server's behavior, issues and solutions.

* Reroute browser's default request from port 80 to port 3000

Since browser requests automatically go to port 80 and
we are running our application on a different port, we
decided to reroute browser requests to port 3000:

iptables
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

* Linking nodejs and node

We updated node in this server, and apparently the latest
version of node has a naming conflict between node and
nodejs. All we have to do is link one to another so we are
able to use features such as forever and others:

sudo ln -s /usr/bin/nodejs /usr/local/bin/node
