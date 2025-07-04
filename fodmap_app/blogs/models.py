from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models

class Blog(models.Model):
    BLOG_TYPES = (
        ('discussion', 'Discussion'),
        ('recipe', 'Recipe'),
    )

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blogs_authored')
    title = models.CharField(unique=True, max_length=100, blank=False, validators=[MinLengthValidator(1)])
    description = models.TextField(blank=False, validators=[MinLengthValidator(3)]) # Optional intro or summary
    type = models.CharField(max_length=10, choices=BLOG_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Food tags for recipes
    foods = models.ManyToManyField('foods.Food', related_name='blogs_tagged')

    def __str__(self):
        return self.title



# class RecipeStep(models.Model):
#     blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='steps')
#     step_number = models.PositiveIntegerField()
#     instruction = models.TextField()
#     image = models.ImageField(upload_to='recipe_steps/', blank=True, null=True)

#     class Meta:
#         ordering = ['step_number']

#     def __str__(self):
#         return f'Step {self.step_number} for {self.blog.title}'