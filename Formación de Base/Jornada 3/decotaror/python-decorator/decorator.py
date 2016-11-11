def p_decorate(func):
   def func_wrapper(name):
       return "<p>{0}</p>".format(func(name))
   return func_wrapper

def strong_decorate(func):
    def func_wrapper(name):
        return "<strong>{0}</strong>".format(func(name))
    return func_wrapper

def div_decorate(func):
    def func_wrapper(name):
        return "<div>{0}</div>".format(func(name))
    return func_wrapper

@div_decorate
@p_decorate
@strong_decorate
def get_text(name):
   return "lorem ipsum, {0} dolor sit amet".format(name)

#Equivalente a:
#get_text = div_decorate(p_decorate(strong_decorate(get_text)))

print "[*] - Este ejemplo muestra como funcionan los decoradores de funciones en un lenguaje como Python.\n"
print "\t" + get_text("John")