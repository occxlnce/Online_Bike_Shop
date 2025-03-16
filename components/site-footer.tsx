import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold mb-4">Banditz Bicycle Club</h3>
            <p className="text-sm text-foreground mb-4">
              Banditz Bicycle Club is your go-to spot for all things cycling in Braamfontein. Whether you're here for
              expert advice, community rides, or to find the perfect bike, we're all about bringing people together on
              two wheels.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-foreground hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/bikes" className="text-foreground hover:text-primary">
                  Bicycles
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-foreground hover:text-primary">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/categories/apparel" className="text-foreground hover:text-primary">
                  Apparel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-foreground hover:text-primary">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/rides" className="text-foreground hover:text-primary">
                  Rides & Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span>44 Stanley Ave, Milpark, Johannesburg, 2092</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <a href="mailto:info@banditz.co.za" className="hover:text-primary">
                  info@banditz.co.za
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span>+27 555 1234 567</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <div>
                  <p>Mon–Fri: 9 AM – 6 PM</p>
                  <p>Sat: 10 AM – 4 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t">
          <p className="text-sm text-center text-foreground">
            © {new Date().getFullYear()} Banditz Bicycle Club. All rights reserved. Developed by OCS.
          </p>
        </div>
      </div>
    </footer>
  )
}

