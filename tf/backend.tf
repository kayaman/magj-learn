terraform { 
  cloud { 
    
    organization = "wdotnet" 

    workspaces { 
      name = "magj-dev" 
    } 
  } 
}