import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("row-level-security", "pl"),
  title: "RLS w Power BI — zabezpieczenia na poziomie wierszy w raportach dla wielu rynków",
  h1: { before: "RLS w Power BI — zabezpieczenia na poziomie wierszy w raportach", accent: "dla wielu rynków" },
  excerpt: "Jak skonfigurować statyczny i dynamiczny RLS w Power BI, aby każdy rynek widział w jednym raporcie tylko swoje dane.",
  lead: "RLS (row-level security) w Power BI to zabezpieczenia na poziomie wierszy: role z filtrami DAX, które ograniczają dane widoczne dla użytkownika. Dzięki nim jeden raport sprzedaży obsługuje wiele rynków, a każdy zespół widzi tylko swoje liczby.",
  date: "2026-06-30",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "do-czego-sluzy-rls", text: "Do czego służy RLS w Power BI" },
    {
      type: "p",
      text: "W międzynarodowej sieci handlowej raport sprzedaży zwykle zaczyna życie jako jeden plik dla centrali. Potem prosi o niego zespół w Polsce, później w Czechach i w Niemczech, i pojawia się pokusa, żeby zrobić kopię dla każdego rynku. Po kilku miesiącach jest kilka wersji tego samego raportu, każda z trochę inną definicją sell-through, a poprawka w jednej nie trafia do pozostałych.",
    },
    {
      type: "p",
      text: "Zabezpieczenia na poziomie wiersza rozwiązują ten problem od strony danych. Raport i model semantyczny są jedne, a Power BI filtruje wiersze w zależności od tego, kto go otwiera. Kierownik sprzedaży w Polsce widzi tylko polskie sklepy i polski e-commerce, zespół w Czechach – tylko czeskie, a centrala – wszystko. Wszyscy korzystają z tych samych miar, tej samej logiki i tego samego harmonogramu odświeżania.",
    },
    {
      type: "p",
      text: "RLS działa na poziomie modelu, a nie wizualizacji. Ograniczenie obowiązuje więc w każdym miejscu, w którym ktoś sięga do danych: na stronach raportu, w eksporcie do Excela, w funkcji „Analizuj w programie Excel” i w nowych raportach zbudowanych na tym samym modelu. Filtr w wizualizacji albo ukryta strona tego nie gwarantują.",
    },
    { type: "h2", id: "statyczny-i-dynamiczny-rls", text: "Statyczny i dynamiczny RLS dla rynków" },
    {
      type: "p",
      text: "Są dwa sposoby budowania ról. W statycznym RLS każda rola ma na sztywno wpisany filtr, na przykład rola „Polska” z warunkiem kod rynku = „PL”. W dynamicznym RLS jest jedna rola, a filtr sam dobiera dane do zalogowanej osoby na podstawie tabeli uprawnień i funkcji USERPRINCIPALNAME(), która zwraca jej adres logowania.",
    },
    {
      type: "table",
      caption: "Statyczny i dynamiczny RLS w Power BI – porównanie",
      columns: [
        { label: "Cecha", kind: "text" },
        { label: "Statyczny RLS", kind: "text" },
        { label: "Dynamiczny RLS", kind: "text" },
      ],
      rows: [
        { cells: ["Liczba ról", "Jedna na rynek", "Jedna dla wszystkich"] },
        { cells: ["Gdzie są uprawnienia", "W definicji ról w pliku", "W tabeli uprawnień w danych"] },
        { cells: ["Nowy rynek", "Nowa rola i ponowna publikacja", "Nowy wiersz w tabeli uprawnień"] },
        { cells: ["Osoba z kilkoma rynkami", "Członek kilku ról", "Kilka wierszy w tabeli"] },
        { cells: ["Kiedy wybrać", "Kilka stałych rynków", "Wiele rynków lub częste zmiany"] },
      ],
    },
    {
      type: "p",
      text: "Moja reguła kciuka: przy trzech–czterech rynkach i stabilnym zespole statyczne role są prostsze i łatwiejsze do sprawdzenia. Gdy rynków jest więcej, gdy ludzie często zmieniają zakres odpowiedzialności albo gdy dostęp ma zależeć także od kategorii czy kanału, wybieram dynamiczny RLS. Zmiana uprawnień sprowadza się wtedy do edycji tabeli, bez dotykania pliku raportu.",
    },
    { type: "h2", id: "role-rynkow-power-bi", text: "Role rynków w Power BI krok po kroku" },
    {
      type: "p",
      text: "Warunkiem jest poprawny model: tabela wymiaru rynku (albo sklepu z kolumną rynku) połączona relacją jeden do wielu z tabelami faktów sprzedaży, zapasów i planu. Filtr założony na wymiar przepływa wtedy relacjami do wszystkich faktów. Konfiguracja wygląda tak:",
    },
    {
      type: "list",
      items: [
        "Krok 1. W Power BI Desktop, na karcie Modelowanie, wybierz „Zarządzaj rolami” i utwórz rolę.",
        "Krok 2. Wskaż tabelę wymiaru rynku i wpisz wyrażenie DAX, które zwraca prawdę dla wierszy, jakie rola ma widzieć.",
        "Krok 3. Sprawdź rolę opcją „Wyświetl jako” (szczegóły w kolejnej sekcji) i opublikuj raport w usłudze Power BI.",
        "Krok 4. W usłudze otwórz ustawienia zabezpieczeń modelu semantycznego i przypisz do ról użytkowników albo grupy zabezpieczeń.",
        "Krok 5. Udostępnij raport odbiorcom z rolą przeglądającego w obszarze roboczym albo przez aplikację.",
      ],
    },
    {
      type: "code",
      caption: "Filtry ról w DAX: statyczna rola dla jednego rynku i dynamiczna rola oparta na tabeli uprawnień (nazwy tabel i kolumn ilustracyjne)",
      code: `-- Rola statyczna „Polska”, filtr na tabeli Rynek
[KodRynku] = "PL"

-- Rola dynamiczna „Rynki”, filtr na tabeli Rynek
[KodRynku]
    IN CALCULATETABLE (
        VALUES ( Uprawnienia[KodRynku] ),
        Uprawnienia[Email] = USERPRINCIPALNAME ()
    )

-- Ta sama rola, filtr na tabeli Uprawnienia (każdy widzi tylko swoje wiersze)
[Email] = USERPRINCIPALNAME ()`,
    },
    {
      type: "p",
      text: "Tabela uprawnień ma dwie kolumny: adres e-mail użytkownika i kod rynku. Osoba odpowiedzialna za dwa rynki ma dwa wiersze. Tabelę najlepiej trzymać poza plikiem raportu, na przykład w pliku SharePoint albo w bazie danych, i ukryć ją w widoku raportu. Nie łączę jej relacją z resztą modelu: wyrażenie z CALCULATETABLE samo wybiera dozwolone rynki, więc nie trzeba włączać relacji dwukierunkowych, które spowalniają model i łatwo wprowadzają niejednoznaczne ścieżki filtrów.",
    },
    {
      type: "p",
      text: "Ten sam wzorzec rozszerza się na inne wymiary. Jeśli kierownik e-commerce na danym rynku ma widzieć tylko sprzedaż internetową, tabela uprawnień dostaje trzecią kolumnę z kanałem, a rola – drugi, analogiczny filtr na tabeli kanałów. Filtry na różnych tabelach w jednej roli działają łącznie, więc użytkownik widzi tylko wiersze spełniające oba warunki. Zanim dodam kolejny wymiar, sprawdzam jednak, czy to naprawdę kwestia uprawnień, a nie wygody, bo do tego wystarczy domyślny filtr raportu.",
    },
    {
      type: "p",
      text: "Centrala, która ma widzieć wszystkie rynki, dostaje osobną rolę bez filtra. Role w Power BI się sumują: jeśli ktoś należy do dwóch ról, widzi wszystkie wiersze dozwolone w którejkolwiek z nich. Dlatego nie da się rolą „odebrać” dostępu nadanego inną rolą, a przypisania warto utrzymywać przez grupy zabezpieczeń, a nie pojedyncze osoby.",
    },
    { type: "h2", id: "test-rls-power-bi", text: "Jak przetestować RLS w Power BI" },
    {
      type: "p",
      text: "Testowanie to etap, którego nie warto skracać, bo błąd w RLS oznacza, że ktoś widzi dane, których nie powinien, albo nie widzi swoich. Sprawdzam role w dwóch miejscach.",
    },
    {
      type: "list",
      items: [
        "W Power BI Desktop: na karcie Modelowanie wybierz „Wyświetl jako” i zaznacz rolę. Dla dynamicznego RLS zaznacz także opcję innego użytkownika i wpisz adres e-mail z tabeli uprawnień, bo USERPRINCIPALNAME() zwraca inaczej Twój własny adres.",
        "W usłudze Power BI: w ustawieniach zabezpieczeń modelu semantycznego wybierz rolę i funkcję „Testuj jako rolę”. Raport otworzy się tak, jak zobaczy go członek tej roli.",
        "Porównaj sumy: sprzedaż widoczna dla każdej roli powinna równać się sumie dla danego rynku w raporcie centrali, a suma wszystkich rynków – wynikowi całej firmy.",
        "Sprawdź przypadek brzegowy: osobę spoza tabeli uprawnień. Powinna zobaczyć pusty raport, a nie wszystkie dane.",
      ],
    },
    {
      type: "p",
      text: "Najczęstsze zaskoczenie przy testach po publikacji: autor raportu widzi wszystko, mimo że jest przypisany do roli. To nie błąd. RLS nie ogranicza osób, które mają w obszarze roboczym rolę administratora, członka ani współautora, bo mogą one edytować model. Filtry działają dla odbiorców z rolą przeglądającego i dla osób, którym raport udostępniono lub które korzystają z aplikacji.",
    },
    { type: "h2", id: "bledy-rls-power-bi", text: "Najczęstsze błędy przy wdrażaniu RLS w Power BI" },
    {
      type: "list",
      items: [
        "Filtr założony na tabelę faktów zamiast na wymiar. Działa, ale jest wolniejszy i nie obejmuje planu ani zapasów, jeśli leżą w osobnych tabelach.",
        "Tabela faktów bez relacji z wymiarem rynku, na przykład plik z planem dołączony później. Rola go nie filtruje i każdy widzi plan wszystkich rynków.",
        "Odbiorcy dodani do obszaru roboczego jako członkowie, a nie przeglądający, przez co RLS ich nie obejmuje.",
        "Adresy w tabeli uprawnień zapisane inaczej niż login, na przykład alias zamiast głównego adresu. Użytkownik widzi wtedy pusty raport.",
        "Miary z udziałem w wyniku całej firmy. Funkcja ALL w DAX nie omija RLS, więc udział rynku liczony od sumy wszystkich rynków zwraca 100%. Jeśli rynki mają widzieć swój udział, wynik całej firmy trzeba dostarczyć w osobnej, zagregowanej tabeli, której RLS nie filtruje.",
      ],
    },
    {
      type: "p",
      text: "RLS ogranicza wiersze, ale nie ukrywa tabel ani kolumn. Jeśli część zespołów nie powinna widzieć na przykład kosztu zakupu i marży, potrzebne są zabezpieczenia na poziomie obiektów (OLS) albo osobny model. To decyzja, którą warto podjąć razem z projektem raportu, a nie po jego publikacji. Więcej o tym, jak zaplanować strony raportu sprzedaży, piszę w artykule o dashboardach w Power BI.",
    },
    {
      type: "p",
      text: "Jeśli przygotowujesz raport dla kilku rynków i chcesz od początku ułożyć model i uprawnienia tak, żeby jeden plik obsłużył wszystkie zespoły, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "RLS w Power BI — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest RLS w Power BI?",
      answer: "RLS, czyli row-level security, to mechanizm Power BI, który filtruje wiersze danych w zależności od roli użytkownika. Role definiuje się w Power BI Desktop za pomocą wyrażeń DAX, a użytkowników przypisuje do nich w usłudze Power BI. Raport jest jeden, ale każdy odbiorca widzi inny zakres danych.",
    },
    {
      question: "Jak sprawdzić RLS w Power BI?",
      answer: "W Power BI Desktop służy do tego opcja „Wyświetl jako” na karcie Modelowanie, która pokazuje raport oczami wybranej roli. Po publikacji rolę testuje się w ustawieniach zabezpieczeń modelu semantycznego funkcją „Testuj jako rolę”. Trzeba pamiętać, że RLS nie ogranicza osób z rolą administratora, członka ani współautora obszaru roboczego.",
    },
    {
      question: "Kiedy wybrać dynamiczny RLS?",
      answer: "Dynamiczny RLS opłaca się, gdy użytkowników i rynków jest wielu albo często się zmieniają. Zamiast osobnej roli dla każdego rynku tworzy się jedną rolę, która przez funkcję USERPRINCIPALNAME() i tabelę uprawnień dobiera dane do zalogowanej osoby. Statyczne role wystarczą przy kilku stałych rynkach.",
    },
  ],
  seo: {
    title: "RLS w Power BI: zabezpieczenia wierszy w raportach",
    description: "Jak skonfigurować statyczny i dynamiczny RLS w Power BI, aby każdy rynek widział w jednym raporcie tylko swoje dane sprzedażowe.",
  },
};
