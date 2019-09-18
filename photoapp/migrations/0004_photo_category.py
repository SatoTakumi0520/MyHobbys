# Generated by Django 2.0.6 on 2019-09-18 17:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('photoapp', '0003_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='photoapp.Category'),
            preserve_default=False,
        ),
    ]
