from django.contrib import admin
from .models import Reciever, Transaction


class RecieverAdmin(admin.ModelAdmin):
    search_fields = ('__str__',)
    list_display = ('__str__', 'image_tag')
    readonly_fields = ('image_tag',)


admin.site.register(Reciever, RecieverAdmin)
admin.site.register(Transaction)
