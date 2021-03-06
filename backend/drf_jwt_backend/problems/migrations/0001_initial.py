# Generated by Django 4.0.3 on 2022-04-07 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.CharField(max_length=255)),
                ('hints', models.CharField(max_length=255)),
                ('answer', models.DecimalField(decimal_places=6, max_digits=24)),
                ('resources', models.CharField(max_length=255)),
            ],
        ),
    ]
