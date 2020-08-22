# Generated by Django 2.2.15 on 2020-08-22 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_event_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='type',
            field=models.CharField(choices=[('Game', 'Game'), ('Event', 'Event')], default='Game', max_length=128),
        ),
    ]
