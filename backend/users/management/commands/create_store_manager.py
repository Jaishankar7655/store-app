from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    help = 'Create a store manager user'

    def add_arguments(self, parser):
        parser.add_argument('--username', type=str, help='Username for the store manager', default='admin')
        parser.add_argument('--email', type=str, help='Email for the store manager', default='admin@grocerystore.com')
        parser.add_argument('--password', type=str, help='Password for the store manager', default='admin123')

    def handle(self, *args, **options):
        username = options['username']
        email = options['email']
        password = options['password']

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'User "{username}" already exists!'))
            return

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            role='store_manager',
            is_staff=True,
            is_superuser=False
        )

        self.stdout.write(self.style.SUCCESS(
            f'Successfully created store manager "{username}"!\n'
            f'Username: {username}\n'
            f'Email: {email}\n'
            f'Password: {password}'
        ))

