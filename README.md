# Wizualizacja Symulacji Procesów Biznesowych
Użytkownikowi wyświetla się lista dostępnych organizacji, z której może dokonać wybrou interesującej go opcji. Na liście zostają wyświetlone nzwy frim. Po zaznaczeniu organizacji na liście użytkownikowi wyświetlają się informacje o organizacji czyli jakie procesy są w firmie. 
Po wyborze organizacji użytkownikowi pokazuje się lista procesów biznesowych, które można symulować. Lista procesów w firmie jest dynamicznie generowana w oparciu o wcześniejszy wybór organizacji. Po wyborze procesu użytkownikowi pokazuje się graficznie przedstawienie procesu. Po wyświetleniu procesu użytkownik posiada możliwość dalszych zmian pocesu, ponieważ symulowana jest cała organizacaja a nie tylko jeden jej proces. Dowolna zmiana między procesami umożliwia wygodny podgląd procesów organizacji podczas trwania symulacji.
Przycisk start  umożliwia uruchomienie symulacji całej organizacji. Po uruchomieniu symulacji użytkownik może skorzystać z dwóch funkcjonalności takiej jak zatrzymanie symulacji i resetowanie symulacji, opcje te są dostępne podczas trwania symulacji. Stop symulacji zatrzymuje trwającą symulację, umożliwia to analizę graficznego przedstawienia procesów w chwili naciśniecia przysiku zatrzymania. Resetowanie symulacji przywraca graficzne przedstawienie procesów do sytuacji sprzed uruchomienia symulacji.
Po zakończeniu symulacji nastąpuje wyświetlenie raportu symulacji. Raport zawiera szczegółowe informacje na temat procesów i czynności zawartych w procesach organizacji.
Aplikacja frontendowa napisana w Angular i Typescript.
Interfejs wyboru organizacji:

![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/54b73f84-9a86-459d-96c6-40106b42be11)

Ekran wyboru organizacji po dokonaniu wyboru:

![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/ffff9f5c-23c7-46fe-a854-f6815b18d3b4)

Ekran symulacji po wybraniu procesu „Basen 2”:

![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/7cffaaa5-88d1-4a95-8d54-754ba1921ff7)

Ekran symulacji po zmianie procesu na „Basen 1”:

![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/5f119629-3cc1-477f-864f-df5eefe9ab76)

Interfejs użytkownika w trakcie trwania symulacji:

 ![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/075cadb8-67f0-47ab-8963-4e9c8508acda)

Podczas symulacji po bokach czynności aktualizowane są liczniki procesów oczekujących, realizowanych i zrealizowanych. Dodatkowo, jeżeli czynność jest realizowana to prostokąt zmienia kolor na zielony, a jeżeli oczekuje na zasób to na żółty.

Interfejs użytkownika po zmianie procesu na „Basen 2” w trakcie trwania symulacji:

![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/53522b7b-c24f-4118-807a-4d11b7ea37c5)

Interfejs użytkownika po zmianie procesu na „Basen 2” w trakcie trwania symulacji:

![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/5f26ce4d-e4bd-41c8-af83-2ab332b96b25)

Interfejs użytkownika po ponownym uruchomieniu symulacji:

![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/5b190358-1fc4-4f3c-be05-590d96fff07b)

Interfejs użytkownika z raportem symulacji:

![image](https://github.com/WojciechKielak/Wizualizacja-symulacji-procesow-biznesowych/assets/120566154/26d75a0a-d4c9-40ac-8ebc-5a584b372ead)

Zdjęcia z przebiegu symulacji zostały zrobione po podłączeniu aplikacji do silnika.
