export type TravelMode = 'flight' | 'train' | 'bus';
export type TravelClass = 'economy' | 'premium' | 'business' | 'first';

// Re-export for convenience
export { type TravelMode as defaultTravelMode, type TravelClass as defaultTravelClass };

export interface SearchParams {
  from: string;
  to: string;
  date: Date;
  passengers: number;
  travelClass: TravelClass;
  mode: TravelMode;
}

export interface TravelResult {
  id: string;
  operator: string;
  operatorLogo: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice: number;
  savings: number;
  mode: TravelMode;
  class: string;
  badge?: 'lowest' | 'fastest' | 'value';
  bookingUrl: string;
  platform: string;
}

export interface AIInsight {
  id: string;
  type: 'savings' | 'timing' | 'alternative' | 'trend';
  title: string;
  description: string;
  potentialSavings?: number;
}

export interface SearchState {
  params: SearchParams;
  results: TravelResult[];
  insights: AIInsight[];
  isLoading: boolean;
  loadingProgress: number;
  loadingText: string;
  error: string | null;
  hasSearched: boolean;
}

export const TRAVEL_CLASSES: { value: TravelClass; label: string }[] = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First Class' },
];

export const TRAVEL_MODES: { value: TravelMode; label: string; icon: string }[] = [
  { value: 'flight', label: 'Flight', icon: 'plane' },
  { value: 'train', label: 'Train', icon: 'train' },
  { value: 'bus', label: 'Bus', icon: 'bus' },
];

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut',
  'Rajkot', 'Kalyan', 'Vasai', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
  'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior',
  'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur',
  'Hubli', 'Tiruchirappalli', 'Mysore', 'Bareilly', 'Aligarh', 'Tiruppur', 'Gurgaon',
  'Moradabad', 'Jalandhar', 'Bhubaneswar', 'Salem', 'Warangal', 'Guntur', 'Bhiwandi',
  'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai',
  'Cuttack', 'Firozabad', 'Kochi', ' Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur',
  'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar',
  'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli', 'Mangalore',
  'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur',
  'Maheshtala', 'Davanagere', 'Kozhikode', 'Kurnool', 'Rajpur', 'Rajahmundry', 'Bokaro',
  'South Dumdum', 'Bellary', 'Patiala', 'Gopalpur', 'Agartala', 'Bhagalpur', 'Muzaffarnagar',
  'Bhatpara', 'Panihati', 'Latur', 'Dhule', 'Rohtak', 'Korba', 'Bhilwara', 'Brahmapur',
  'Muzaffarpur', 'Ahmednagar', 'Mathura', 'Kollam', 'Avadi', 'Kadapa', 'Anantapur',
  'Kamarhati', 'Bilaspur', 'Sambalpur', 'Shahjahanpur', 'Satara', 'Bijapur', 'Rampur',
  'Shivamogga', 'Chandrapur', 'Junagadh', 'Thrissur', 'Alwar', 'Bardhaman', 'Kulti',
  'Kakinada', 'Nizamabad', 'Parbhani', 'Tumkur', 'Khammam', 'Ozhukarai', 'Bihar Sharif',
  'Panipat', 'Darbhanga', 'Bally', 'Aizawl', 'Dewas', 'Ichalkaranji', 'Karnal', 'Bathinda',
  'Jalna', 'Eluru', 'Kirari Suleman Nagar', 'Purnia', 'Satna', 'Mau', 'Sonipat', 'Farrukhabad',
  'Sagar', 'Rourkela', 'Durg', 'Imphal', 'Ratlam', 'Hapur', 'Araria', 'Arrah', 'Karimnagar',
  'Anantapur', 'Etawah', 'Ambernath', 'North Dumdum', 'Bharatpur', 'Begusarai', 'New Delhi',
  'Gandhidham', 'Baranagar', 'Tiruvottiyur', 'Puducherry', 'Sikar', 'Thoothukudi', 'Rewa',
  'Mirzapur', 'Raichur', 'Pali', 'Ramagundam', 'Silchar', 'Vizianagaram', 'Nagercoil',
  'Thanjavur', 'Katihar', 'Sambhal', 'Morbi', 'Munger', 'Chhapra', 'Machilipatnam',
  'Bhiwani', 'Kumbakonam', 'Deoghar', 'Haldia', 'Santipur', 'Nalgonda', 'Hathras',
  'Madhyamgram', 'Banda', 'Raiganj', 'Nadiad', 'Gangtok', 'Karawal Nagar', 'Mango',
  'Shimla', 'Gudivada', 'Yamunanagar', 'Patan', 'Proddatur', 'Bhusawal', 'Ongole',
  'Kharagpur', 'Adoni', 'Beawar', 'Chittoor', 'Nandyal', 'Bongaigaon', 'Paradip',
  'Hindupur', 'Puri', 'Medininagar', 'Nagda', 'Port Blair', 'Bidar', 'Srikakulam',
  'Gondia', 'Deoria', 'Hosur', 'Unnao', 'Siwan', 'Hajipur', 'Bulandshahr', 'Hospet',
  'Phusro', 'Jaunpur', 'Sultanpur', 'Tadipatri', 'Wadhwan', 'Bhadreswar', 'Navsari',
  'Buxar', 'Pilkhuwa', 'Perambalur', 'Tinsukia', 'Vapi', 'Tezpur', 'Khair', 'Yavatmal',
  'Sawai Madhopur', 'Shillong', 'Purulia', 'North Lakhimpur', 'Tadepalligudem', 'Narasaraopet',
  'Rajapalayam', 'Tanda', 'Sehore', 'Balurghat', 'Nagapattinam', 'Sivasagar', 'Vidisha',
  'Gadag', 'Shimoga', 'Hosapete', 'Udupi', 'Karwar', 'Kishanganj', 'Raebareli', 'Bahraich',
  'Azamgarh', 'Hardoi', 'Lakhimpur', 'Sitapur', 'Unnao', 'Banda', 'Chhatarpur', 'Damoh',
  'Datia', 'Dewas', 'Guna', 'Hoshangabad', 'Mandsaur', 'Neemuch', 'Raisen', 'Rajgarh',
  'Ratlam', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Tikamgarh',
  'Umaria', 'Vidisha', 'Ashoknagar', 'Burhanpur', 'Alirajpur', 'Anuppur', 'Balaghat',
  'Barwani', 'Betul', 'Bhind', 'Chhindwara', 'Dhar', 'Dindori', 'Gwalior', 'Indore',
  'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandaur', 'Morena',
  'Narsinghpur', 'Panna', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol',
  'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria',
  'Vidisha', 'Agar Malwa', 'Niwari', 'Ahmadabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha',
  'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka',
  'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar',
  'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot',
  'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad', 'Baksa', 'Barpeta',
  'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji',
  'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup',
  'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli',
  'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar',
  'Tinsukia', 'Udalguri', 'West Karbi Anglong', 'Araria', 'Arwal', 'Aurangabad', 'Banka',
  'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya',
  'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj',
  'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada',
  'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar',
  'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran', 'Balod', 'Baloda Bazar',
  'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari',
  'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham',
  'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur',
  'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja', 'North Goa',
  'South Goa', 'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch',
  'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka',
  'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar',
  'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot',
  'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'
];
