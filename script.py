import os, sys

def main(argv):

    #os.system("./vuln {arg}".format(arg = argv[0]))
    stream = os.popen("./vuln {arg}".format(arg = argv[0]))
    output = stream.read()
    print(output)
if __name__ == "__main__":
    main(sys.argv[1:])
