# Generated by Django 4.0.3 on 2022-04-18 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('problems', '0006_problem_correctanswers_problem_hintsused_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='problem',
            name='answer',
            field=models.TextField(max_length=255),
        ),
    ]
