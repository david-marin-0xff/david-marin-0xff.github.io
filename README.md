ðŸ§… Local Onion Site Setup



This project hosts a static website locally and serves it as a Tor hidden service.



How it works:



A simple Python web server (python -m http.server 8080) serves the site locally.



Tor runs with a torrc file that forwards hidden service traffic (port 80) to that local server (127.0.0.1:8080).



When Tor starts and reaches â€œBootstrapped 100%â€, your .onion site becomes live.



To start:



cd "C:\\Users\\David\\david-marin-0xff.github.io"

py -3 -m http.server 8080



cd C:\\tor\\tor

.\\tor.exe -f C:\\tor\\tor\\torrc





Onion address:



http://mlpccnptaxvzwnumv7ljhaclfwlb2v4hpq5557inrzzxxkpu42vkdhad.onion/


