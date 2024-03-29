# Generated by Django 3.2.9 on 2023-06-05 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0005_vip'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='picture_height',
            field=models.PositiveIntegerField(blank=True, editable=False, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='picture_width',
            field=models.PositiveIntegerField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='profile_picture',
            field=models.ImageField(blank=True, height_field='picture_height', null=True, upload_to='profile_pictures/', width_field='picture_width'),
        ),
    ]
