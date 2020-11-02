#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>

#define SIZE 64

char secret[SIZE];

void sigsegv_handler(int sig) {
  fprintf(stderr, "%s\n", secret);
  fflush(stderr);
  exit(1);
}

void vuln(char *input){
  char buf[16];
  strcpy(buf, input);
}

int main(int argc, char **argv){
  
  FILE *f = fopen("secret.txt","r");
  fgets(secret,SIZE,f);
  signal(SIGSEGV, sigsegv_handler);
  
  gid_t gid = getegid();
  setresgid(gid, gid, gid);
  
  if (argc > 1) {
    vuln(argv[1]);
    printf("Received: %s", argv[1]);
  }
  else
    printf("One argument needed.\n");
  return 0;
}
